'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type ContactInquiry = {
  id: string;
  name: string;
  phone: string;
  inquiry: string;
  submittedAt?: string;
  raw: Record<string, unknown>;
};

type MembershipApplication = {
  id: string;
  name: string;
  nameEn: string;
  phone: string;
  nid: string;
  presentAddressUpazila?: string;
  presentAddressDistrict?: string;
  submittedAt?: string;
  raw: Record<string, unknown>;
};

type SelectedRecord =
  | { type: 'applications'; title: string; raw: Record<string, unknown> }
  | { type: 'inquiries'; title: string; raw: Record<string, unknown> };

function includes(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}

export function AdminDashboard({
  inquiries,
  applications,
}: {
  inquiries: ContactInquiry[];
  applications: MembershipApplication[];
}) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<SelectedRecord | null>(null);

  const filteredInquiries = useMemo(() => {
    if (!query.trim()) return inquiries;
    return inquiries.filter((i) =>
      includes(i.name, query) || includes(i.phone, query) || includes(i.inquiry, query)
    );
  }, [inquiries, query]);

  const filteredApplications = useMemo(() => {
    if (!query.trim()) return applications;
    return applications.filter((a) =>
      includes(a.name, query) ||
      includes(a.nameEn, query) ||
      includes(a.phone, query) ||
      includes(a.nid, query) ||
      includes(a.presentAddressUpazila ?? '', query) ||
      includes(a.presentAddressDistrict ?? '', query)
    );
  }, [applications, query]);

  return (
    <div className="space-y-6">
      <Dialog open={Boolean(selected)} onOpenChange={(open) => (!open ? setSelected(null) : null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selected?.title ?? 'Details'}</DialogTitle>
          </DialogHeader>

          <pre className="max-h-[70vh] overflow-auto rounded-md bg-muted p-3 text-xs">
            {selected ? JSON.stringify(selected.raw, null, 2) : ''}
          </pre>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Collect and manage form submissions.</p>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-[520px] md:flex-row md:items-center md:justify-end">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, phone, NID, message…"
          />
          <Button asChild variant="outline">
            <a href="/admin/logout">Logout</a>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{applications.length}</div>
            <div className="text-sm text-muted-foreground">Total collected</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{inquiries.length}</div>
            <div className="text-sm text-muted-foreground">Total collected</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications" className="w-full">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <TabsList>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button asChild variant="outline">
              <a href="/admin/export?type=applications">Export Applications (CSV)</a>
            </Button>
            <Button asChild variant="outline">
              <a href="/admin/export?type=inquiries">Export Inquiries (CSV)</a>
            </Button>
          </div>
        </div>

        <TabsContent value="applications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Latest Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name (BN)</TableHead>
                    <TableHead>Name (EN)</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>NID</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead className="text-right">View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>{a.submittedAt ? new Date(a.submittedAt).toLocaleString() : '-'}</TableCell>
                      <TableCell>{a.name}</TableCell>
                      <TableCell>{a.nameEn}</TableCell>
                      <TableCell>{a.phone}</TableCell>
                      <TableCell>{a.nid}</TableCell>
                      <TableCell>
                        {[a.presentAddressUpazila, a.presentAddressDistrict].filter(Boolean).join(', ') || '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setSelected({
                              type: 'applications',
                              title: `Application: ${a.nameEn || a.name || a.id}`,
                              raw: { id: a.id, ...a.raw },
                            })
                          }
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inquiries" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Latest Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="text-right">View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInquiries.map((i) => (
                    <TableRow key={i.id}>
                      <TableCell>{i.submittedAt ? new Date(i.submittedAt).toLocaleString() : '-'}</TableCell>
                      <TableCell>{i.name}</TableCell>
                      <TableCell>{i.phone}</TableCell>
                      <TableCell className="max-w-[640px] truncate">{i.inquiry}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setSelected({
                              type: 'inquiries',
                              title: `Inquiry: ${i.name || i.id}`,
                              raw: { id: i.id, ...i.raw },
                            })
                          }
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
