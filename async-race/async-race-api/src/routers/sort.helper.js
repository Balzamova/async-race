export default function sort(array) {
  array.sort((a, b) => {
    const c = +a.id;
    const d = +b.id;

    return c - d;
  });
  return array;
}