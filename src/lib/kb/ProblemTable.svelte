<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { groupByCause, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  // One row per problem in a merged ticket: the causes from causes.ts, with the reports the desk
  // read as a one-day move (desk-notes.json) taken out of their tenant's cause into a row of their own.
  let { ticket, tickets }: { ticket: number; tickets: Record<string, string> } = $props();

  const merged = $derived(uniqueById(reports as Report[]).filter((r) => r.mergedInto === ticket));
  const moved = (r: Report) => notes.oneDayMove.includes(r.id);
  const rows = $derived(
    [
      ...groupByCause(merged.filter((r) => !moved(r)), tenantOf).map((g) => ({ problem: g.cause as string, reports: g.reports })),
      { problem: 'one-day move', reports: merged.filter(moved) },
    ]
      .filter((p) => p.reports.length)
      .map((p) => {
        const days = p.reports.map((r) => r.receivedAt.slice(0, 10)).sort();
        return { ...p, tenants: new Set(p.reports.map((r) => r.tenant)).size, seen: `${days[0]} → ${days[days.length - 1]}` };
      }),
  );
</script>

<p class="sum">
  <strong>{merged.length}</strong> reports merged into #{ticket} · <strong>{rows.length}</strong> problems
</p>

<table>
  <thead><tr><th>problem</th><th>reports</th><th>tenants</th><th>seen</th><th>ticket</th></tr></thead>
  <tbody>
    {#each rows as p (p.problem)}
      <tr>
        <td><code>{p.problem}</code></td>
        <td>{p.reports.length}</td>
        <td>{p.tenants}</td>
        <td>{p.seen}</td>
        <td>{#if tickets[p.problem]}<a href={tickets[p.problem]}>{tickets[p.problem].replace(/.*\/issues\//, 'issue ')}</a>{:else}none yet{/if}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .sum { font-size: 1.1rem; }
</style>
