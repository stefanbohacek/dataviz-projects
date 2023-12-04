const countWords = (text) => text.split(' ')
                                 .filter(function(n) { return n != '' })
                                 .length;

export default countWords;
