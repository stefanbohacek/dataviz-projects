const getMastodonURL = (username) => {
    const usernameSplit = username.split('@');
    const url = `https://${usernameSplit[1]}/@${usernameSplit[0]}`;
    return url;
}

export default getMastodonURL;
