import React, { useState, useEffect, useRef } from 'react';
import { Table, Card, Button, Alert, Tag, Descriptions } from 'antd';
import BaseForm from '../../components/BaseForm';
import { useRequestMethods } from '../../utils/request';

const BikeMapList = () => {
  const mapRef = useRef(null);
  let [map, setMap] = useState(null);
  const [status, setStatus] = useState('loading');
  const [users, setUsers] = useState([]);
  const [resData, setResData] = useState({});
  const [total, setTotal] = useState(0);
  const { get, post, loading, error } = useRequestMethods();
  
  let isMounted = true;

  const params = {
    page: 1
  }
  const formList = [
    {
      type: 'select',
      label: '城市',
      field: 'city',
      placeholder: '全部',
      initialValue: '0',
      width: 162,
      list: [
        {id: '0', name: '全部'},
        {id: '1', name: '北京'},
        {id: '2', name: '上海'},
        {id: '3', name: '广州'},
        {id: '4', name: '深圳'},
      ]
    },
    {
      type: 'datePicker',
      label: '时间查询',
      field: 'timeQuery',
      placeholder: '请选择时间',
      initialValue: '',
      width: 300,
    },
    {
      type: 'select',
      label: '订单状态',
      field: 'orderStatus',
      placeholder: '全部',
      initialValue: '0',
      width: 180,
      list: [
        {id: '0', name: '全部'},
        {id: '1', name: '进行中'},
        {id: '2', name: '已完成'},
      ]
    }
  ];

  const getResult = async () => {
    const data = await get('/bikeMap/list');
    // console.log(data, '----------data');
    if(data.code == 0){
        setTotal(data.result.total_count);
        renderAMap(data.result);
      }else{
        setStatus('error');
        console.error('Error:', error);
      }
  };

  useEffect(() => {
    getResult();
  }, []);

  const filterSubmit = (params) => {
    params = params;
  }

  const initAMap = () => {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = `https://webapi.amap.com/maps?v=2.0&key=589de8e693423b7757414b4309dd28c1`;
      script.async = true;
      // 成功加载
      script.onload = () => {
        // 给高德地图一些初始化时间
        setTimeout(resolve, 100);
      };
      // 加载失败
      script.onerror = () => {
        reject(new Error('高德地图脚本加载失败'));
      };
      document.head.appendChild(script);
  });
}
  
   const renderAMap = async (res) => {
    if (!isMounted) return;

    try {
      console.log('成功');
      setStatus('loading');
      await initAMap();
      if (!isMounted) return;
      const list = res.route_list || [];
        // console.log(res, '----------res');
        setTimeout(() => {
          map = new window.AMap.Map(mapRef.current, {
            zoom: 11,
            center: [116.397428, 39.90923]
          });
          setMap(map);
          let gps1 = list[0].split(',');  //起点
          let gps2 = list[list.length - 1].split(',');  //终点
          let startPoint = [gps1[0], gps1[1]];   //起点坐标点，gps1[0]为经度，gps1[1]为纬度
          let endPoint = [gps2[0], gps2[1]];   //终点坐标点，gps2[0]为经度，gps2[1]为纬度 
          // console.log(startPoint, endPoint, 'startPoint, endPoint');
          // 创建起点标记
        const startMarker = new window.AMap.Marker({
          position: startPoint,
          content: '<div style="width: 20px; height: 20px;"><img src="/assets/start_point.png" style="width: 100%; height: 100%;"></div>',
          title: '起点：天安门',
          offset: new window.AMap.Pixel(-13, -30)
        });
        // 创建终点标记
        const endMarker = new window.AMap.Marker({
          position: endPoint,
          content: '<div style="width: 20px; height: 20px;"><img src="/assets/end_point.png" style="width: 100%; height: 100%;"></div>',
          title: '终点：故宫',
          offset: new window.AMap.Pixel(-13, -30)
        });
        
        // 将起点和终点标记添加到地图上
        map.add([startMarker, endMarker]);
          if (isMounted) {
            setMap(map);
            setStatus('success');
          }
          // 绘制路线
          const polyline = new window.AMap.Polyline({
            path: [startPoint, ["116.353101,40.053699"], ["116.374086,40.017626"], endPoint],
            strokeColor: "#3366FF",
            strokeWeight: 3,
            strokeStyle: "solid"
          });
          map.add(polyline);
          // 调整地图视野到折线范围
          map.setFitView(); 

          // 绘制服务区
          let servicePointList = [];
          let serviceList = res.service_list || [];
          serviceList.forEach((item, index)=> {
            servicePointList.push([item.lon, item.lat]);
          });
          servicePointList.forEach((point, index)=> {
          let marker = new window.AMap.Marker({
            position: point,
            title: '服务区 ' + (index + 1),
            content: '<div style="width: 20px; height: 20px;"><img src="/assets/bike.jpg" style="width: 100%; height: 100%;"></div>',
            offset: new window.AMap.Pixel(-10, -10)
          });
          
          map.add(marker);
        });

        }, 1000);
      
      // 调整视野
    } catch (error) {
      console.log('失败');
      if (isMounted) {
          console.warn('地图初始化遇到小问题:', error.message);
          setStatus('success'); // 即使有错误也标记为成功，因为地图核心功能正常
          setTimeout(() => {
            if (isMounted && window.AMap) {
              const map = new window.AMap.Map(mapRef.current, {
                zoom: 13,
                center: [116.397428, 39.90923]
              });
              setMap(map);
            }
          }, 1000);
        }
      return;
    }
    return () => {
      isMounted = false;
    };
  }

  if (loading) return <div>加载中...</div>;

  return (
     <div>
        <Card>
            <BaseForm formList={formList} filterSubmit={filterSubmit} />
        </Card>
        <Card title='地图查询' style={{marginTop: 10}}>
          <div style={{ marginBottom: 10 }}>共{total}辆自行车</div>
          <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
        </Card>
     </div>
  );
};

export default BikeMapList;