import { useStore } from "../../../contexts/store";

function Transaction({ amount, label }: { amount: number; label: string }) {
  return <li>{`${label}: ${amount.toFixed(2)}`}</li>;
}

export function Transactions({ account }: { account?: string }) {
  const { transactions } = useStore();
  return (
    <ul>
      {transactions
        .filter((datum) => !account || datum.account === account)
        .map((datum) => (
          <Transaction key={datum.label} {...datum} />
        ))}
    </ul>
  );
}
