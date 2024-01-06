// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generatedStudentId = (payload: any) => {
  const currentId = (0).toString().padStart(4, '0');
  let incrementId = (Number(currentId) + 1).toString();

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
