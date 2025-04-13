
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const competitorInsights = [
  {
    id: 1,
    competitor: "Đối thủ A",
    strengths: "Nội dung chất lượng cao, hiện diện tốt trên mạng xã hội",
    weaknesses: "SEO kém, tỷ lệ chuyển đổi thấp",
    strategy: "Tập trung vào nội dung và quảng cáo mạng xã hội",
    opportunity: "Cải thiện SEO để tăng lưu lượng",
    impact: "high"
  },
  {
    id: 2,
    competitor: "Đối thủ B",
    strengths: "SEO mạnh, trang web tối ưu hóa chuyển đổi",
    weaknesses: "Nội dung ít cập nhật, tương tác mạng xã hội thấp",
    strategy: "Tập trung vào SEO và tối ưu hóa trang web",
    opportunity: "Tăng cường nội dung và tương tác mạng xã hội",
    impact: "medium"
  },
  {
    id: 3,
    competitor: "Đối thủ C",
    strengths: "Đa dạng sản phẩm, chương trình khuyến mãi hấp dẫn",
    weaknesses: "Giao diện người dùng kém, tốc độ trang web chậm",
    strategy: "Tiếp thị sản phẩm và chiến lược giá",
    opportunity: "Cải thiện UX và tốc độ trang web",
    impact: "high"
  },
  {
    id: 4,
    competitor: "Đối thủ D",
    strengths: "Email marketing hiệu quả, chăm sóc khách hàng tốt",
    weaknesses: "Ít sản phẩm, phạm vi tiếp cận hẹp",
    strategy: "Tập trung vào tiếp thị email và dịch vụ khách hàng",
    opportunity: "Mở rộng danh mục sản phẩm",
    impact: "low"
  },
];

const CompetitorInsightsTable = () => {
  return (
    <div className="rounded-md border overflow-hidden overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Đối thủ</TableHead>
            <TableHead>Điểm mạnh</TableHead>
            <TableHead>Điểm yếu</TableHead>
            <TableHead>Chiến lược</TableHead>
            <TableHead>Cơ hội</TableHead>
            <TableHead>Mức độ ảnh hưởng</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {competitorInsights.map((insight) => (
            <TableRow key={insight.id}>
              <TableCell className="font-medium">{insight.competitor}</TableCell>
              <TableCell>{insight.strengths}</TableCell>
              <TableCell>{insight.weaknesses}</TableCell>
              <TableCell>{insight.strategy}</TableCell>
              <TableCell>{insight.opportunity}</TableCell>
              <TableCell>
                <Badge variant={
                  insight.impact === "high" 
                    ? "destructive" 
                    : insight.impact === "medium" 
                      ? "default" 
                      : "secondary"
                }>
                  {insight.impact === "high" 
                    ? "Cao" 
                    : insight.impact === "medium" 
                      ? "Trung bình" 
                      : "Thấp"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Chi tiết
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompetitorInsightsTable;
