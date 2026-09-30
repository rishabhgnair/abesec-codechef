/**
 * Helper to export an array of registration objects to a downloadable CSV file
 */
export function exportRegistrationsToCSV(registrations, filename = 'codechef7_registrations.csv') {
  if (!registrations || registrations.length === 0) {
    return false;
  }

  const headers = ['Event Name', 'Player Name', 'Email', 'College Year', 'Phone', 'Registration Time'];

  const rows = registrations.map((r) => [
    `"${(r.eventName || '').replace(/"/g, '""')}"`,
    `"${(r.name || '').replace(/"/g, '""')}"`,
    `"${(r.email || '').replace(/"/g, '""')}"`,
    `"${(r.collegeYear || '').replace(/"/g, '""')}"`,
    `"${(r.phone || '').replace(/"/g, '""')}"`,
    `"${new Date(r.createdAt).toLocaleString()}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return true;
}
