export const getUserUniqueIds = <T>(messages: (T & { userId: string })[]) => {
  return messages
    .filter(
      (item, index, array) =>
        array.findIndex((i) => i.userId === item.userId) === index
    )
    .map((i) => i.userId);
};
