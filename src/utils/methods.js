// Delete html tags and truncate string
export function stripAndTruncate(string, number = 40) {
  let stripString = string.replace(/(<([^>]+)>)/gi, "");
  let result = stripString.substring(0, number) + "...";

  return result;
}
