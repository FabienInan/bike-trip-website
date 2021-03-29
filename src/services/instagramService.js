const instagramPrefixUrl = 'https://graph.instagram.com/'

const token = 'IGQVJVdHZAVRXVVMENGM3VtbDVNS3I5WWhQWVUtSEhQa05qQTdKV2VkMHhrcldCb1VwanV4Wm5aaU0zdmduRFhPUERzVk04VjJPdEZAtaVpKRlJSUXZAaR19zNnBpUDBfRC04aENwWFJiRXFrME5oTWw2ZAQZDZD';

const userId = '17841439623886373';

const params = 'fields=id,media_type,media_url,permalink,children{media_url}';

export const getPostImages = (id) => {
	const cachedUrls = JSON.parse(localStorage.getItem(`InstaImage_${id}`));
	if (cachedUrls  !== null) {
		return Promise.resolve(cachedUrls);
	}
	return fetch(`${instagramPrefixUrl}/${userId}/media?${params}&access_token=${token}`)
		.then(response => response.json())
		.then(response => response.data && response.data.reduce(media => {
			const shortCode = media.permalink.split('/')[4];
			let urls = [];
			if (shortCode === id) {
				if (media.children) {
					urls = media.children.data.map(mediaData => mediaData.media_url);
				}
				else {
					urls = media.media_url;
				}
			}
			localStorage.setItem(`InstaImage_${id}`, JSON.stringify(urls));
			return urls;
		}));
}