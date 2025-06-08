const SpanWithTooltip = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => (
  <span title={value} className={className}>
    {value}
  </span>
);

export default SpanWithTooltip;
