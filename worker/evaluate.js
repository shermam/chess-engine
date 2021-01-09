/**
 * @param position {Int8Array}
 */
export const evaluate = (position) => {
  let evaluation = 0;
  for (var i = 0; i < position.length; i++) {
    evaluation += position[i] ?? 0;
  }
  return evaluation;
};
