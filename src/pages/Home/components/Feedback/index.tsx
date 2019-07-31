import React from 'react';
import { Input, Button } from 'antd';
import styles from './index.less';

function Feedback() {
  const areaVal = '';

  /**
   * textArea 内容更新
   */
  function handleAreaChange(e) {
    areaVal = e.target.value;
  }

  return (
    <section className={styles.feedbackWrap}>
      <h3>意见反馈</h3>
      <div className={styles.feedbackTxt}>
        <p>0532-110</p>
        <p>
          <span>反馈热线</span>
          <span>周一至周五 9:00 - 18:00</span>
        </p>
      </div>
      <div>
        <Input.TextArea rows={6} placeholder="请输入您的意见和建议" onChange={handleAreaChange} />
      </div>
      <div className={styles.footerBtn}>
        <Button type="primary">提交</Button>
      </div>
    </section>
  );
}

export default Feedback;
