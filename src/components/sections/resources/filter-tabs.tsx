'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function FilterTabs() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="whitepapers">Whitepapers</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

