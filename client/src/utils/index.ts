export const shortenAddress = (address: string) => (address ? `${address.slice(0, 10)}...${address.slice(address.length - 5)}` : "");

export const getTailwindWidthPercent = (n: number) => {
  const array = [0, 8, 16, 20, 33, 40, 50, 60, 66, 75, 80, 83, 91, 100];
  const closest = array.reduce(function (prev, curr) {
    return Math.abs(curr - n) < Math.abs(prev - n) ? curr : prev;
  });

  switch (closest) {
    case 0:
      return "w-0";
    case 8:
      return "w-1/12";
    case 16:
      return "w-1/6";
    case 20:
      return "w-1/5";
    case 33:
      return "w-2/6";
    case 40:
      return "w-2/5";
    case 50:
      return "w-3/6";
    case 60:
      return "w-3/5";
    case 66:
      return "w-4/6";
    case 75:
      return "w-9/12";
    case 80:
      return "w-4/5";
    case 83:
      return "w-5/6";
    case 91:
      return "w-11/12";
    case 100:
      return "w-full";
    default:
      return "w-0";
  }
};
