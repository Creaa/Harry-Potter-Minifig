const calculateListParametersToRandomDraw = (totalCount: number, drawNumber: number) => {
  if (totalCount < drawNumber) {
    return { page: 1, page_size: totalCount };
  }

  const modulo = totalCount % drawNumber;

  if (modulo === 0) {
    return { page: Math.floor((Math.random() * totalCount) / drawNumber), page_size: drawNumber };
  }

  let counter = drawNumber;
  while (totalCount % counter !== 0) {
    counter++;
  }

  return { page: Math.floor((Math.random() * totalCount) / counter), page_size: counter };
};

export default calculateListParametersToRandomDraw;
