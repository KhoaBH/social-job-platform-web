"use client";
import { useState } from "react";
import { jobSuggestions, suggestedConnections, trendingTopics } from "../data/mockData";

export default function RightSidebar() {
  const [connected, setConnected] = useState<number[]>([]);

  return (
    <div className="right-col">
      {/* Jobs */}
      <div className="widget-card">
        <div className="widget-title">Việc làm gợi ý</div>
        {jobSuggestions.map((job, i) => (
          <div className="job-item" key={i}>
            <div className="job-logo" style={{ background: job.color }}>{job.logo}</div>
            <div className="job-info">
              <div className="job-title">{job.title}</div>
              <div className="job-company">{job.company}</div>
              <div className="job-salary">{job.salary}/tháng</div>
            </div>
            <button className="apply-btn">Nộp CV</button>
          </div>
        ))}
        <div className="widget-footer">Xem thêm →</div>
      </div>

      {/* People */}
      <div className="widget-card">
        <div className="widget-title">Người bạn có thể biết</div>
        {suggestedConnections.map((person, i) => (
          <div className="person-item" key={i}>
            <div className="person-ava" style={{ background: person.color }}>{person.avatar}</div>
            <div className="person-info">
              <div className="person-name">{person.name}</div>
              <div className="person-role">{person.role}</div>
              <div className="person-mutual">{person.mutual} kết nối chung</div>
            </div>
            <button
              className={`connect-btn${connected.includes(i) ? " done" : ""}`}
              onClick={() =>
                setConnected((prev) =>
                  prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
                )
              }
            >
              {connected.includes(i) ? "✓ Đã kết nối" : "+ Kết nối"}
            </button>
          </div>
        ))}
        <div className="widget-footer">Xem tất cả →</div>
      </div>

      {/* Trending */}
      <div className="widget-card">
        <div className="widget-title">Xu hướng hôm nay</div>
        {trendingTopics.map((t, i) => (
          <div className="trend-item" key={i}>
            <div className="trend-tag">{t.tag}</div>
            <div className="trend-count">{t.count}</div>
          </div>
        ))}
      </div>

      <div className="footer-links">
        Giới thiệu · Điều khoản · Chính sách · Cookie
        <br />© 2026 Jub Vietnam
      </div>
    </div>
  );
}