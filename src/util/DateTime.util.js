export class DateTime {
  static ConvertTimestampToStringDate = (dt) => {
    const date = new Date(dt * 1000);
    return date.toLocaleDateString();
  };

  static ConvertTimestampToStringTime = (dt) => {
    const date = new Date(dt * 1000);
    return date.toLocaleTimeString();
  };

  static ConvertTimestampToStringDateTime = (dt) => {
    const date = new Date(dt * 1000);
    return date.toLocaleString();
  };
}
