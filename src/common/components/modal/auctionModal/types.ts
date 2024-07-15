export interface AuctionPayloadProps {
  name: string;
  category: string;
  description?: string;
  startPrice: number;
  currentHighestBid?: number;
  image: string,
  auctionStartTime: Date;
  auctionEndTime: Date;
}