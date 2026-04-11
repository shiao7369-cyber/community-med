export default function PrivacyNotice() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
        <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        個人資料保護聲明
      </h4>
      <p className="mb-1.5">
        依據《個人資料保護法》第8條規定，本系統蒐集您的帳號資訊（包含帳號名稱、登入時間、IP 位址）
        係基於<strong>醫療業務管理及資訊安全稽核</strong>之特定目的。
      </p>
      <p className="mb-1.5">
        您的登入紀錄將僅用於系統存取控制與安全稽核，不會提供予第三方使用。
        本系統部署於院內 Tailscale 私有網路，所有傳輸均經加密保護。
      </p>
      <p>
        如需行使個資查閱、更正、刪除等權利，請洽系統管理員。
      </p>
    </div>
  );
}
