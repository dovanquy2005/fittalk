import { PostCard } from "@/components/posts/PostCard";
import { CreatePost } from "@/components/posts/CreatePost";

const samplePosts = [
  {
    author: {
      name: "Sarah Johnson",
      handle: "@sarahfit",
      avatar: "/images/feed-1.jpg",
      verified: true
    },
    content: "Vừa hoàn thành buổi HIIT 45 phút tuyệt vời! 🔥 Cảm giác phấn chấn không thể tả. Hãy nhớ: sự kiên trì luôn thắng sự hoàn hảo. Mọi người thích tập cardio kiểu gì nhất?",
    timestamp: "2 giờ trước",
    likes: 124,
    comments: 18,
    shares: 7,
    category: "workout" as const,
    tags: ["HIIT", "cardio", "động lực"]
  },
  {
    author: {
      name: "Mike Chen",
      handle: "@mikelifts",
      avatar: "/images/feed-2.jpg",
      verified: false
    },
    content: "Chủ nhật chuẩn bị bữa ăn! 🥗 Gà nướng, quinoa và rau củ nướng. Dinh dưỡng chiếm đến 70% kết quả của bạn. Ai đang chuẩn bị cho tuần mới thành công nào?",
    image: "/images/feed-7.jpg",
    timestamp: "4 giờ trước",
    likes: 89,
    comments: 23,
    shares: 15,
    category: "nutrition" as const,
    tags: ["mealprep", "ăn lành mạnh", "dinh dưỡng"]
  },
  {
    author: {
      name: "Emma Wilson",
      handle: "@emmayoga",
      avatar: "/images/feed-3.jpg",
      verified: true
    },
    content: "🧘‍♀️ Đối thủ duy nhất của bạn là chính bạn ngày hôm qua. Tiến bộ không phải lúc nào cũng là nâng nặng hơn hay chạy nhanh hơn – đôi khi chỉ là dám xuất hiện dù không muốn. Cố lên, các chiến binh! ✨",
    timestamp: "6 giờ trước",
    likes: 256,
    comments: 42,
    shares: 38,
    category: "motivation" as const,
    tags: ["tư duy", "động lực", "chăm sóc bản thân"]
  },
  {
    author: {
      name: "Alex Rodriguez",
      handle: "@alexstrong",
      avatar: "/images/feed-5.jpg",
      verified: false
    },
    content: "Cập nhật sau 6 tháng thay đổi! 💪 Giảm 11kg và cảm thấy khỏe mạnh hơn bao giờ hết. Chìa khóa là kiên định trong cả tập luyện lẫn ăn uống. Cảm ơn cộng đồng tuyệt vời này đã luôn ủng hộ!",
    image: "/images/feed-1.jpg",
    video: true,
    timestamp: "8 giờ trước",
    likes: 432,
    comments: 67,
    shares: 52,
    category: "progress" as const,
    tags: ["biến đổi", "tiến bộ", "kiên trì"]
  },
  {
    author: {
      name: "Dr. Lisa Park",
      handle: "@drlisamd",
      avatar: "/images/feed-6.jpg",
      verified: true
    },
    content: "💡 Mẹo thể hình: Phục hồi quan trọng như việc tập luyện! Cơ bắp phát triển trong lúc nghỉ ngơi chứ không phải lúc tập. Hãy ngủ đủ 7–9 tiếng và đừng quên các ngày nghỉ nhé.",
    timestamp: "12 giờ trước",
    likes: 178,
    comments: 29,
    shares: 41,
    category: "workout" as const,
    tags: ["phục hồi", "giấc ngủ", "mẹo"]
  }
];

export const Feed = () => {
  return (
    <div className="flex-1 max-w-2xl mx-auto p-6 space-y-6">
      <CreatePost />

      <div className="space-y-6">
        {samplePosts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>

      {/* Nút tải thêm */}
      <div className="text-center py-8">
        <button className="text-primary hover:text-primary-glow font-medium">
          Xem thêm bài viết
        </button>
      </div>
    </div>
  );
};
