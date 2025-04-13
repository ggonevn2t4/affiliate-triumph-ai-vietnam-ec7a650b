
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, DollarSign, LineChart, BarChart4, ArrowUpRight, ArrowDownRight, Package } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import StatCard from "@/components/dashboard/StatCard";

// Sample data - in a real app this would come from your database
const earningsData = [
  { 
    id: 1, 
    program: "Shopee Affiliates", 
    date: "2023-04-10", 
    product: "Smartphone X", 
    amount: 250000, 
    status: "Paid",
    commission: 5
  },
  { 
    id: 2, 
    program: "Lazada Partners", 
    date: "2023-04-05", 
    product: "Laptop Pro", 
    amount: 450000, 
    status: "Pending",
    commission: 3
  },
  { 
    id: 3, 
    program: "Tiki Affiliates", 
    date: "2023-03-28", 
    product: "Bluetooth Speaker", 
    amount: 120000, 
    status: "Paid",
    commission: 7
  },
  { 
    id: 4, 
    program: "Sendo Partners", 
    date: "2023-03-20", 
    product: "Smart Watch", 
    amount: 180000, 
    status: "Pending",
    commission: 6
  },
  { 
    id: 5, 
    program: "Shopee Affiliates", 
    date: "2023-03-15", 
    product: "Coffee Maker", 
    amount: 95000, 
    status: "Paid",
    commission: 4
  },
];

const programSummary = [
  { program: "Shopee Affiliates", earnings: 1250000, transactions: 28, growth: 12.5 },
  { program: "Lazada Partners", earnings: 950000, transactions: 17, growth: 8.3 },
  { program: "Tiki Affiliates", earnings: 780000, transactions: 22, growth: -4.2 },
  { program: "Sendo Partners", earnings: 650000, transactions: 15, growth: 15.7 },
];

const formatVND = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(value);
};

const EarningsTracker = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("overview");
  
  const totalEarnings = programSummary.reduce((sum, program) => sum + program.earnings, 0);
  const totalTransactions = programSummary.reduce((sum, program) => sum + program.transactions, 0);
  const avgCommission = earningsData.reduce((sum, item) => sum + item.commission, 0) / earningsData.length;
  
  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Theo dõi thu nhập</h2>
          <div className="flex gap-2">
            <TabsList>
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="transactions">Giao dịch</TabsTrigger>
              <TabsTrigger value="programs">Chương trình</TabsTrigger>
            </TabsList>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-1" />
              Thêm giao dịch
            </Button>
          </div>
        </div>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Tổng thu nhập" 
              value={formatVND(totalEarnings)}
              icon={<DollarSign className="h-4 w-4 text-brand-blue" />}
              change={8.5}
              changeText="so với tháng trước"
            />
            <StatCard 
              title="Số giao dịch" 
              value={totalTransactions.toString()}
              icon={<BarChart4 className="h-4 w-4 text-brand-purple" />}
              change={12.3}
              changeText="so với tháng trước"
            />
            <StatCard 
              title="Hoa hồng trung bình" 
              value={`${avgCommission.toFixed(1)}%`}
              icon={<LineChart className="h-4 w-4 text-green-500" />}
              change={0.5}
              changeText="so với tháng trước"
            />
            <StatCard 
              title="Chương trình đang tham gia" 
              value={programSummary.length.toString()}
              icon={<Package className="h-4 w-4 text-orange-500" />}
              changeText="2 chương trình mới"
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Giao dịch gần đây</CardTitle>
              <CardDescription>Các giao dịch hoa hồng từ tất cả các chương trình affiliate</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Chương trình</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead className="text-right">Số tiền</TableHead>
                    <TableHead>Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {earningsData.slice(0, 5).map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.program}</TableCell>
                      <TableCell>{new Date(transaction.date).toLocaleDateString('vi-VN')}</TableCell>
                      <TableCell>{transaction.product}</TableCell>
                      <TableCell className="text-right">{formatVND(transaction.amount)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status === 'Paid' ? 'Đã thanh toán' : 'Đang chờ'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="outline" size="sm" onClick={() => setActiveTab("transactions")}>
                Xem tất cả giao dịch
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tất cả giao dịch</CardTitle>
              <CardDescription>Lịch sử giao dịch và thu nhập hoa hồng</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Chương trình</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead className="text-right">Số tiền</TableHead>
                    <TableHead>Tỷ lệ hoa hồng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {earningsData.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.program}</TableCell>
                      <TableCell>{new Date(transaction.date).toLocaleDateString('vi-VN')}</TableCell>
                      <TableCell>{transaction.product}</TableCell>
                      <TableCell className="text-right">{formatVND(transaction.amount)}</TableCell>
                      <TableCell>{transaction.commission}%</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status === 'Paid' ? 'Đã thanh toán' : 'Đang chờ'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="programs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chương trình Affiliate</CardTitle>
              <CardDescription>Hiệu suất của các chương trình affiliate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {programSummary.map((program, index) => (
                  <Card key={index} className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{program.program}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Tổng thu nhập</p>
                          <p className="text-xl font-semibold">{formatVND(program.earnings)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Số giao dịch</p>
                          <p className="text-xl font-semibold">{program.transactions}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center">
                        <span className={`flex items-center text-sm font-medium ${program.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {program.growth >= 0 ? 
                            <ArrowUpRight className="w-4 h-4 mr-1" /> : 
                            <ArrowDownRight className="w-4 h-4 mr-1" />
                          }
                          {Math.abs(program.growth)}% so với tháng trước
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EarningsTracker;
