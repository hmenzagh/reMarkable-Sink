/* ************************************************************************** */
/*                                                                            */
/*                                                       ;::      ::::::::    */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: hmenzagh <hmenzagh@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/16 20:10:06 by hmenzagh          #+#    #+#             */
/*   Updated: 2020/11/17 01:46:46 by hmenzagh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import fs from 'fs';
import _ from 'lodash';
import child from 'child_process';
import watchman from 'fb-watchman';

const { SINK_FOLDER_PATH, PATH_TO_RMAPI, REMARKABLE_FOLDER, RMAPI_CONFIG } = process.env;

const client = new watchman.Client();

// ====================================================== //
// ================== Initiate Watchman ================= //
// ====================================================== //

client.capabilityCheck({
	optional: [],
	required: ['relative_root'],
},
(error) => {
	if (error) {
		console.error('Error initiating watch:', error);
		return;
	}
	client.command(
		['watch-project', SINK_FOLDER_PATH],
		(error, resp) => {
			if (error) { console.error('Error initiating watch:', error); return; }
			if ('warning' in resp) { console.log('warning: ', resp.warning); }

			const { watch } = resp;
			// ~~~~~~~~ Subscribe to Watchman ~~~~~~~~ //
			client.command(
				['clock', watch],
				(error, resp) => {
					if (error) { console.error('Failed to query clock:', error); return; }

					const subPrefs = {
						expression: ['allof', ['match', '*.pdf']],
						fields: ['name', 'exists'],
						since: resp.clock,
					};

					client.command(
						['subscribe', watch, 'PDFSubscription', subPrefs],
						() => {
							console.log('Watch established on', watch);
						},
					);
				},
			);
		},
	);
});

// ====================================================== //
// =================== Process Changes ================== //
// ====================================================== //

// Needed for multiple file uploads
let filesCache = [];

const processFiles = _.debounce((files) => {
	if (files.length) {
		const RmApi = child.spawn(`export RMAPI_CONFIG=${RMAPI_CONFIG} && ${PATH_TO_RMAPI}`);
		// ~~~~~~~~~~~~~ Upload Files ~~~~~~~~~~~~ //
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			RmApi.stdin.write(`put "${SINK_FOLDER_PATH}/${file}" "/${REMARKABLE_FOLDER}"\n`);
		}
		RmApi.on('exit', (code) => {
			// ~~~~~~~~~~~~~ Delete Files ~~~~~~~~~~~~ //
			files.forEach(async (file) => {
				fs.unlinkSync(`${SINK_FOLDER_PATH}/${file}`);
			});
			filesCache = [];
			if (code !== 0)
				throw new Error(`RmApi exited with error code: ${code}`);
		});
		RmApi.stdin.end();
	}
}, 2000);

client.on('subscription', (resp) => {
	if (resp.subscription !== 'PDFSubscription') return;

	// ~~~~~~~~~ Update Files to Push ~~~~~~~~ //
	const files = resp.files.reduce((acc, curr) =>
		(curr.exists ? { ...acc, toAdd: [...acc.toAdd, curr.name] } : { ...acc, toDel: [...acc.toDel, curr.name] }),
	{ toAdd: [], toDel: [] });
	filesCache = _.without(_.uniq([...filesCache, ...files.toAdd]), ...files.toDel);

	processFiles(filesCache);
});


client.on('subscription', (resp) => {
	if (resp.subscription !== 'PDFSubscription') return;

	// ~~~~~~~~~ Update Files to Push ~~~~~~~~ //
	const files = resp.files.reduce((acc, curr) =>
		curr.exists ? {...acc, toAdd: [...acc.toAdd, curr.name]} : {...acc, toDel: [...acc.toDel, curr.name]},
		{ toAdd: [], toDel: [] })
	filesCache = _.without(_.uniq([...filesCache, ...files.toAdd]), ...files.toDel)

	processFiles(filesCache)
});
