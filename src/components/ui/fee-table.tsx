import { fees, feesNote } from "@/content/membership";
import { cn } from "@/lib/utils";

/** Real IEEE RVCE membership fees. Student row is highlighted as the entry point. */
export function FeeTable({ className }: { className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-none border border-line", className)}>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">IEEE RVCE membership fees</caption>
        <thead>
          <tr className="bg-surface-muted text-xs uppercase tracking-wider text-text-muted">
            <th scope="col" className="px-5 py-4 font-medium">Membership</th>
            <th scope="col" className="px-5 py-4 text-right font-medium">New</th>
            <th scope="col" className="px-5 py-4 text-right font-medium">Renewal</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee) => (
            <tr
              key={fee.name}
              className={cn(
                "border-t border-line",
                fee.highlight ? "bg-ieee-blue/5" : "bg-surface",
              )}
            >
              <th
                scope="row"
                className={cn(
                  "px-5 py-4 text-sm font-medium",
                  fee.highlight ? "text-ieee-blue" : "text-brand-deep",
                )}
              >
                {fee.name}
              </th>
              <td className="px-5 py-4 text-right font-mono text-sm text-text">
                {fee.joining}
              </td>
              <td className="px-5 py-4 text-right font-mono text-sm text-text-muted">
                {fee.renewal}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-line bg-surface px-5 py-4 text-xs text-text-muted">
        {feesNote}
      </p>
    </div>
  );
}
