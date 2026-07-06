"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  emoji: string;
  description: string;
  accent: string;
};

type PaymentMethod = {
  id: string;
  name: string;
  note: string;
  icon: string;
};

const products: Product[] = [
  { id: 1, name: "晨霧陶瓷杯", category: "餐桌生活", price: 128, emoji: "☕", description: "霧面釉色與舒適杯形，讓每天的第一杯更有儀式感。", accent: "sand" },
  { id: 2, name: "雲朵香薰燈", category: "居家香氣", price: 268, emoji: "☁️", description: "柔和燈光配合香薰，為房間營造安靜舒適的氣氛。", accent: "lavender" },
  { id: 3, name: "日常帆布袋", category: "隨身配件", price: 158, emoji: "👜", description: "耐用厚帆布設計，容量剛好，適合上班與週末出行。", accent: "sage" },
  { id: 4, name: "木調擴香組", category: "居家香氣", price: 198, emoji: "🌿", description: "清新木質香調，讓回家成為一天之中最放鬆的時刻。", accent: "moss" },
  { id: 5, name: "小宇宙桌燈", category: "生活家品", price: 328, emoji: "💡", description: "三段亮度與暖光模式，陪你閱讀、工作與慢慢生活。", accent: "peach" },
  { id: 6, name: "輕旅隨行瓶", category: "隨身配件", price: 148, emoji: "🥤", description: "輕巧、防漏、容易清洗，是日常補水的理想拍檔。", accent: "sky" },
];

const paymentMethods: PaymentMethod[] = [
  { id: "card", name: "Visa / Mastercard", note: "信用卡付款", icon: "💳" },
  { id: "alipay", name: "AlipayHK", note: "支付寶香港", icon: "🔵" },
  { id: "payme", name: "PayMe", note: "PayMe 轉帳", icon: "💜" },
  { id: "fps", name: "轉數快 FPS", note: "銀行即時轉帳", icon: "⚡" },
];

export default function Home() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].id);

  const selectedPayment = paymentMethods.find((method) => method.id === paymentMethod) || paymentMethods[0];
  const itemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const total = useMemo(
    () => products.reduce((sum, product) => sum + product.price * (cart[product.id] || 0), 0),
    [cart]
  );

  function addToCart(id: number) {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
    setCartOpen(true);
  }

  function updateQuantity(id: number, change: number) {
    setCart((current) => {
      const next = (current[id] || 0) + change;
      const updated = { ...current };
      if (next <= 0) delete updated[id];
      else updated[id] = next;
      return updated;
    });
  }

  const orderText = encodeURIComponent(
    `你好，我想訂購以下商品：\n${products
      .filter((product) => cart[product.id])
      .map((product) => `• ${product.name} x ${cart[product.id]} — HK$${product.price * cart[product.id]}`)
      .join("\n")}\n\n付款方式：${selectedPayment.name}\n總額：HK$${total}\n\n請提供付款連結或收款資料，謝謝。`
  );

  return (
    <main>
      <div className="announcement">全店購物滿 HK$500 免本地運費 · 支援 Visa / Mastercard / AlipayHK / PayMe / 轉數快</div>
      <header className="site-header">
        <a className="logo" href="#top" aria-label="Mori Select 首頁">
          MORI<span>SELECT</span>
        </a>
        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#new" onClick={() => setMenuOpen(false)}>新品</a>
          <a href="#products" onClick={() => setMenuOpen(false)}>全部商品</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>關於我們</a>
        </nav>
        <div className="header-actions">
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="開啟選單">☰</button>
          <button className="cart-button" onClick={() => setCartOpen(true)}>
            購物袋 <span>{itemCount}</span>
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">SLOW LIVING, BETTER DAYS</p>
          <h1>把喜歡的日常，<br />慢慢帶回家。</h1>
          <p className="hero-text">精選實用而有溫度的生活物件，讓平凡的每一天，也有值得期待的小細節。</p>
          <div className="hero-buttons">
            <a className="primary-button" href="#products">立即選購</a>
            <a className="text-link" href="#about">認識我們 <span>→</span></a>
          </div>
          <div className="payment-strip" aria-label="支援付款方式">
            {paymentMethods.map((method) => (
              <span key={method.id}>{method.icon} {method.name}</span>
            ))}
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="sun"></div>
          <div className="leaf leaf-one">⌇</div>
          <div className="leaf leaf-two">⌇</div>
          <div className="hero-card card-back"><span>slow</span><strong>days</strong></div>
          <div className="hero-card card-front"><span>mori</span><strong>select</strong><small>生活中的美好選物</small></div>
        </div>
      </section>

      <section className="benefits">
        <div><span>✦</span><strong>用心選物</strong><p>每件商品都經過細心挑選</p></div>
        <div><span>⌂</span><strong>香港本地寄送</strong><p>一般訂單 2–4 個工作天送達</p></div>
        <div><span>♡</span><strong>多種付款</strong><p>支援信用卡、AlipayHK、PayMe、轉數快</p></div>
      </section>

      <section className="section" id="products">
        <div className="section-heading">
          <div><p className="eyebrow">OUR FAVOURITES</p><h2>本週人氣選物</h2></div>
          <a href="#products">查看全部商品 →</a>
        </div>
        <div className="product-grid" id="new">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className={`product-image ${product.accent}`}>
                <span className="product-badge">人氣</span>
                <span className="product-emoji">{product.emoji}</span>
              </div>
              <div className="product-info">
                <p className="product-category">{product.category}</p>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-footer">
                  <strong>HK${product.price}</strong>
                  <button onClick={() => addToCart(product.id)} aria-label={`加入 ${product.name} 到購物車`}>＋</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="story" id="about">
        <div className="story-art"><div>暮らし<br /><span>の</span><br />小さな幸せ</div></div>
        <div className="story-copy">
          <p className="eyebrow">OUR STORY</p>
          <h2>我們相信，生活的質感<br />藏在每一個小選擇裡。</h2>
          <p>Mori Select 由一份對簡單生活的喜愛開始。我們尋找兼具設計、實用與溫度的物件，希望你收到的不只是商品，而是一份讓生活變得更舒服的心意。</p>
          <a className="text-link" href="mailto:hello@moriselect.hk">與我們聯絡 <span>→</span></a>
        </div>
      </section>

      <section className="newsletter">
        <p className="eyebrow">STAY IN THE LOOP</p>
        <h2>接收新品與限定優惠</h2>
        <p>偶爾寄一封信，分享我們最近喜歡的生活選物。</p>
        <form onSubmit={(event) => event.preventDefault()}>
          <input type="email" placeholder="輸入你的電郵地址" aria-label="電郵地址" required />
          <button type="submit">訂閱</button>
        </form>
      </section>

      <footer>
        <div className="footer-logo">MORI<span>SELECT</span></div>
        <p>精選生活中的美好小物。</p>
        <div className="footer-links"><a href="#products">商品</a><a href="#about">關於</a><a href="mailto:hello@moriselect.hk">聯絡</a></div>
        <small>© 2026 Mori Select. All rights reserved.</small>
      </footer>

      {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)}></div>}
      <aside className={cartOpen ? "cart-drawer open" : "cart-drawer"} aria-hidden={!cartOpen}>
        <div className="cart-header"><div><p className="eyebrow">YOUR BAG</p><h2>購物袋</h2></div><button onClick={() => setCartOpen(false)}>×</button></div>
        <div className="cart-items">
          {itemCount === 0 ? (
            <div className="empty-cart"><span>🛍️</span><h3>購物袋是空的</h3><p>去看看有沒有喜歡的生活選物吧。</p></div>
          ) : products.filter((product) => cart[product.id]).map((product) => (
            <div className="cart-item" key={product.id}>
              <div className={`cart-thumb ${product.accent}`}>{product.emoji}</div>
              <div className="cart-item-info"><h3>{product.name}</h3><p>HK${product.price}</p><div className="quantity"><button onClick={() => updateQuantity(product.id, -1)}>−</button><span>{cart[product.id]}</span><button onClick={() => updateQuantity(product.id, 1)}>＋</button></div></div>
              <strong>HK${product.price * cart[product.id]}</strong>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <section className="payment-box">
            <p className="payment-title">選擇付款方式</p>
            <div className="payment-options">
              {paymentMethods.map((method) => (
                <button
                  className={paymentMethod === method.id ? "payment-option active" : "payment-option"}
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  type="button"
                >
                  <span>{method.icon}</span>
                  <strong>{method.name}</strong>
                  <small>{method.note}</small>
                </button>
              ))}
            </div>
          </section>
          <div><span>小計</span><strong>HK${total}</strong></div>
          <p>運費將於確認訂單時另行計算。付款資料會在確認訂單後提供。</p>
          <a className={itemCount ? "checkout-button" : "checkout-button disabled"} href={itemCount ? `https://wa.me/?text=${orderText}` : undefined} target="_blank" rel="noreferrer">使用 WhatsApp 下單</a>
          <button className="continue-button" onClick={() => setCartOpen(false)}>繼續購物</button>
        </div>
      </aside>
    </main>
  );
}
