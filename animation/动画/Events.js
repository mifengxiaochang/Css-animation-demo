import React from 'react';
import { map, slice } from 'lodash';
import moment from 'moment';
import decorate from 'assets/decorate.png';
import decorate1 from 'assets/decrate1.png';
import decorate2 from 'assets/decrate2.png';
import decorate3 from 'assets/decrate3.png';
import decorate4 from 'assets/decrate4.png';
import defaultUserIconBig from 'assets/default-user-big.png';
import defaultAvatarUrl from 'assets/default-user-event-icon.png';
import ModuleBorder from 'components/ModuleBorder';
import styles from './Events.less';

function animate(dom, json, interval = 1, sp = 0.1, fn) {
  const obj = dom;
  clearInterval(obj.timer);
  // var k = 0;
  // var j = 0;
  function getStyle(objs, arr) {
    if (objs.currentStyle) {
      return objs.currentStyle[arr]; // 针对ie
    } else {
      return document.defaultView.getComputedStyle(objs, null)[arr];
    }
  }
  obj.timer = setInterval(() => {
    // j ++;
    let flag = true;
    for (const arr in json) {
      if (Object.prototype.hasOwnProperty.call(json, arr)) {
        let icur = 0;
        // k++;
        if (arr === 'opacity') {
          icur = Math.round(parseFloat(getStyle(obj, arr)) * 100);
        } else {
          icur = parseInt(getStyle(obj, arr), 10);
        }
        let speed = (json[arr] - icur) * sp;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (icur !== json[arr]) {
          flag = false;
        }
        if (arr === 'opacity') {
          obj.style.filter = "alpha(opacity : '+(icur + speed)+' )";
          obj.style.opacity = (icur + speed) / 100;
        } else {
          obj.style[arr] = `${icur + speed}px`;
        }
      }

      // console.log(j + "," + arr +":"+ flag);
    }

    if (flag) {
      clearInterval(obj.timer);
      // console.log(j + ":" + flag);
      // console.log("k = " + k);
      // console.log("j = " + j);
      // console.log("DONE");
      if (fn) {
        fn();
      }
    }
  }, interval);
}

class Events extends React.Component {
  componentWillReceiveProps(nextProps) {
    const oldData = this.props.data;
    const newData = nextProps.data;
    if (oldData && newData && oldData.id !== newData.id) {
      const active = document.getElementById('persionEvent').getElementsByTagName('li');
      for (let i = 0; i < active.length; i += 1) {
        console.log(i);
        console.log(active[i].offsetWidth);
        animate(active[i], { left: `-${active[i].offsetWidth}` });
      }
    }
  }

  getPersonInfo = (v) => {
    const { data } = v;
    return (

      <div className={styles.personInfo}>
        <ModuleBorder
          title="INFORMAÇÃO DE BI"
          className="personModuleBorder"
        >
          <div className={styles.contents}>
            {/* <div className={styles['person-number']}>
              {data.personCode}
            </div> */}
            <div className={styles.infomation}>
              <div className={styles.images}>
                <img src={data.avatarUrl || defaultUserIconBig} alt="" />
              </div>
              <div className={styles.info}>
                <div className={styles['info-name']}>
                  <span className={styles.whiteBox} />
                  <span className={styles.name}>
                    {data.personName}
                  </span>
                </div>
                <div className={styles['info-contry']}>
                  <div>NACIONALIDADE</div>
                  <div>{data.country}</div>
                </div>
                <div className={styles.birth}>
                  <div className={styles['birth-day']}>
                    <div>DATA DE NASCIMENTO</div>
                    <div>{moment(data.birthday).format('L')}</div>
                  </div>
                  <div className={styles['birth-place']}>
                    <div>PROVINCIA DE</div>
                    <div>{data.birthplace}</div>
                  </div>
                </div>
                <div className={styles.date}>
                  <div className={styles['date-issue']}>
                    <div>EMITIDO EM</div>
                    <div>{moment(data.certificationDate).format('L')}</div>
                  </div>
                  <div className={styles['date-valid']}>
                    <div>VÁLIDO ATÉ</div>
                    <div>{moment(data.duration).format('L')}</div>
                  </div>
                </div>
              </div>
              <div className={styles.decorate}>
                <img className={styles.decorateImg} src={decorate} alt="" />
              </div>
              <img className={styles.decorateOne} src={decorate1} alt="" />
              <img className={styles.decorateTwo} src={decorate2} alt="" />
              <img className={styles.decorateThree} src={decorate3} alt="" />
              <img className={styles.decorateFour} src={decorate4} alt="" />
            </div>
          </div>
        </ModuleBorder>
      </div>
    );
  }
  getPersonEvents = (v) => {
    return (
      <div className={styles.personEventsBox}>
        <ul id="persionEvent" className={styles.personEvents}>
          {map(v.data, (value, index) => {
            return (
              <li key={index}>
                <div className={styles.space} />
                <div className={styles.box}>
                  <div className={styles.border}>
                    <span />
                  </div>
                  <div className={styles.relation}>
                    <span>
                      {value.relation}
                    </span>
                  </div>
                  <div className={styles.relationInfo}>
                    <div className={styles.relationDetails}>
                      <div className={styles.relationImg}>
                        <img src={value.otherAvatarUrl || defaultAvatarUrl} alt="" />
                      </div>
                      <div className={styles.particulars}>
                        <div className={styles.relationName}>
                          {value.otherName}
                        </div>
                        <div className={styles.IDCardAndAge}>
                          <div className={styles.IdCard}>
                            <div className={styles.IdCardTitle}>
                              DI.N°
                            </div>
                            <div className={styles.IdCardContent}>
                              {value.personIdCard}
                            </div>
                          </div>
                          {/* <div className={styles.Age}>
                            <div className={styles.AgeTitle}>
                              AIDADE
                            </div>
                            <div className={styles.AgeContent}>
                              {(moment().diff((moment(parseInt(value.birthday, 10)).format
                                ('YYYY-MM-DD')), 'years')) + 1}
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  render() {
    const { data } = this.props;
    const Data = data.events ? slice(data.events, 0, 3) : [];
    return (
      <div className={styles.Events}>
        {this.getPersonInfo({
          data,
        })}
        {
          this.getPersonEvents({
            data: Data,
          })
        }
      </div>
    );
  }
}
export default Events;
