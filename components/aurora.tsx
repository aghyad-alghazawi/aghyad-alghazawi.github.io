"use client"

import Styles from "@/styles/modules/aurora.module.css"

export const Aurora = () => {
  return (
    <div className={`${Styles["gradients-container"]}`}>
      <div className={`${Styles["gradient-item"]} ${Styles.first}`} />
      <div className={`${Styles["gradient-item"]} ${Styles.second}`} />
      <div className={`${Styles["gradient-item"]} ${Styles.third}`} />
      <div className={`${Styles["gradient-item"]} ${Styles.fourth}`} />
      <div className={`${Styles["gradient-item"]} ${Styles.fifth}`} />
    </div>
  )
}
