import { cookies } from "next/headers";

// __mocks__/checkout.ts
export const getIdFromCookies = (channel: string): string | null => {
    // Return a mock checkout ID based on the channel
    return channel === "mockChannel" ? "mockCheckoutId" : null;
  };
  
  export const find = async (checkoutId: string) => {
    // Return a mock checkout object
    if (checkoutId === "mockCheckoutId") {
      return {
        id: checkoutId,
        lines: [
          { id: "line1", quantity: 2 },
          { id: "line2", quantity: 3 },
        ],
      };
    }
    return null;
  };
  