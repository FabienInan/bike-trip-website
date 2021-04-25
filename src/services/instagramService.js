const instagramPrefixUrl = 'https://graph.instagram.com/'

const token = 'IGQVJWeHUxd0RxZAjg3dF9GOU5yLVNxMlplTGtGTzJHOE5JbXVZAd0taZAktOa3d4Mk1EM1l6ZAmgwbURqMGQ3VEtJeTZASRE5zdTdQZADNkbHlVUjZAEMWpfRnZACTlEzY1EzWFZAPQ0xEbDl4LXhoSHNKdW8tcQZDZD';

const userId = '17841439623886373';

const params = 'fields=id,media_type,media_url,permalink,children{media_url}';

export const getPostImages = (id) => {
	const cachedUrls = JSON.parse(localStorage.getItem(`InstaImage_${id}`));
	if (cachedUrls  !== null) {
		return Promise.resolve(cachedUrls);
	}
	return fetch(`${instagramPrefixUrl}/${userId}/media?${params}&access_token=${token}`)
		.then(response => response.json())
		.then(response => {
			let urls = [];
			response.data && response.data.forEach(media => {
			const shortCode = media.permalink.split('/')[4];
			if (shortCode === id) {
				if (media.children) {
					urls = media.children.data.map(mediaData => mediaData.media_url);
				}
				else {
					urls = media.media_url;
				}
			}
			if (urls.length > 0) {
				localStorage.setItem(`InstaImage_${id}`, JSON.stringify(urls));
				return;
			}
		})
		return urls;
	});
}
