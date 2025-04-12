
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart2, TrendingUp, TrendingDown } from "lucide-react";

const campaignData = [
  { 
    id: 1, 
    name: "Shopee Mega Sale", 
    impressions: 4250, 
    clicks: 872, 
    ctr: 20.52, 
    conversions: 104, 
    convRate: 11.93, 
    revenue: 12450000, 
    status: "active",
    trend: "up"
  },
  { 
    id: 2, 
    name: "Lazada Summer", 
    impressions: 2830, 
    clicks: 523, 
    ctr: 18.48, 
    conversions: 68, 
    convRate: 13.00, 
    revenue: 7850000, 
    status: "active",
    trend: "up"
  },
  { 
    id: 3, 
    name: "Tiki Tech Week", 
    impressions: 1950, 
    clicks: 412, 
    ctr: 21.13, 
    conversions: 45, 
    convRate: 10.92, 
    revenue: 5320000, 
    status: "active",
    trend: "down"
  },
  { 
    id: 4, 
    name: "Beauty Products", 
    impressions: 1780, 
    clicks: 354, 
    ctr: 19.89, 
    conversions: 41, 
    convRate: 11.58, 
    revenue: 4850000, 
    status: "paused",
    trend: "down"
  },
  { 
    id: 5, 
    name: "Home & Living", 
    impressions: 2080, 
    clicks: 397, 
    ctr: 19.09, 
    conversions: 52, 
    convRate: 13.10, 
    revenue: 6280000, 
    status: "active",
    trend: "up"
  },
];

const CampaignTable = () => {
  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className="rounded-md border overflow-hidden overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Tên chiến dịch</TableHead>
            <TableHead className="text-right">Impressions</TableHead>
            <TableHead className="text-right">Clicks</TableHead>
            <TableHead className="text-right">CTR</TableHead>
            <TableHead className="text-right">Chuyển đổi</TableHead>
            <TableHead className="text-right">Tỷ lệ CV</TableHead>
            <TableHead className="text-right">Doanh thu</TableHead>
            <TableHead className="text-right">Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaignData.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium flex items-center">
                <BarChart2 className="h-4 w-4 mr-2 text-gray-500" />
                {campaign.name}
              </TableCell>
              <TableCell className="text-right">{campaign.impressions.toLocaleString()}</TableCell>
              <TableCell className="text-right">{campaign.clicks.toLocaleString()}</TableCell>
              <TableCell className="text-right">{campaign.ctr.toFixed(2)}%</TableCell>
              <TableCell className="text-right">{campaign.conversions}</TableCell>
              <TableCell className="text-right">{campaign.convRate.toFixed(2)}%</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end">
                  {formatVND(campaign.revenue)}
                  {campaign.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 ml-1 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 ml-1 text-red-500" />
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                  {campaign.status === "active" ? "Đang chạy" : "Tạm dừng"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CampaignTable;
