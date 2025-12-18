import { Status } from '../../configs/constants.tsx';

type StatusProps = {
  value: string;
};

const OrderStatusBadge = ({ value = '' }: StatusProps) => {
  const status = Status[value as keyof typeof Status];

  if (!status)
    return (
      <span
        style={{
          color: '#ffffff',
          backgroundColor: '#cc9966',
          padding: '3px 8px',
          borderRadius: '15px',
        }}
      >
				{value}
			</span>
    );

  return (
    <span
      style={{
        color: status.textColor,
        backgroundColor: status.labelColor,
        padding: '3px 8px',
        borderRadius: '15px',
      }}
    >
			{status.name}
		</span>
  );
};

export default OrderStatusBadge;
