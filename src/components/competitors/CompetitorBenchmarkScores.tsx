
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";

const benchmarkData = [
  { subject: 'Tỷ lệ chuyển đổi', bạn: 70, điểmChuẩnNgành: 65 },
  { subject: 'Engagement', bạn: 80, điểmChuẩnNgành: 90 },
  { subject: 'Tỷ lệ nhấp chuột', bạn: 65, điểmChuẩnNgành: 60 },
  { subject: 'ROI', bạn: 85, điểmChuẩnNgành: 75 },
  { subject: 'Chi phí thu hút', bạn: 60, điểmChuẩnNgành: 70 },
  { subject: 'Chất lượng nội dung', bạn: 90, điểmChuẩnNgành: 80 },
];

const benchmarkInsights = [
  {
    title: "Tỷ lệ chuyển đổi",
    performance: "above",
    score: "70%",
    benchmark: "65%",
    advice: "Hiệu suất tốt hơn điểm chuẩn. Tiếp tục tối ưu hóa các phễu chuyển đổi."
  },
  {
    title: "Engagement",
    performance: "below",
    score: "80%",
    benchmark: "90%",
    advice: "Cải thiện tương tác người dùng bằng cách tăng cường nội dung phong phú và tương tác."
  },
  {
    title: "Chất lượng nội dung",
    performance: "above",
    score: "90%",
    benchmark: "80%",
    advice: "Tiếp tục duy trì chất lượng nội dung cao và chia sẻ giá trị để giữ vững lợi thế."
  }
];

const CompetitorBenchmarkScores = () => {
  return (
    <div className="space-y-8">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={benchmarkData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Điểm của bạn" dataKey="bạn" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
            <Radar name="Điểm chuẩn ngành" dataKey="điểmChuẩnNgành" stroke="#F97316" fill="#F97316" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {benchmarkInsights.map((insight, index) => (
          <Card key={index} className={
            insight.performance === "above" 
              ? "border-l-4 border-l-green-500" 
              : "border-l-4 border-l-amber-500"
          }>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">{insight.title}</h4>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Điểm của bạn</span>
                <span className="font-medium">{insight.score}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-sm text-gray-500">Điểm chuẩn</span>
                <span className="font-medium">{insight.benchmark}</span>
              </div>
              <p className="text-sm text-gray-600 border-t pt-3">{insight.advice}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium text-blue-700 mb-2">Lời khuyên từ AI</h3>
        <p className="text-sm text-blue-800">
          Dựa trên phân tích so sánh, bạn đang thực hiện tốt hơn điểm chuẩn ngành trong Tỷ lệ chuyển đổi và Chất lượng nội dung. 
          Tập trung cải thiện Engagement để đạt được hiệu suất tốt hơn. Xem xét nghiên cứu các chiến lược tương tác của đối thủ hàng đầu.
        </p>
      </div>
    </div>
  );
};

export default CompetitorBenchmarkScores;
