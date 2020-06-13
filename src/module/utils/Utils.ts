import MD5 from 'js-md5';

export default class Utils {
  static md5 = (word: any) => MD5(word);
}
