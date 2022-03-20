interface ISubscriptionCreateDto {
  code: string;
  user_id: string;
  amount: number;
  cron: string;
}

interface ISubscriptionUpdateDto {
  code: string;
  amount: number;
  cron: string;
}

export { ISubscriptionCreateDto, ISubscriptionUpdateDto };
