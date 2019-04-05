package cn.edu.nju.travel.service.impl;

import cn.edu.nju.travel.dao.ActivityDao;
import cn.edu.nju.travel.dao.RelationDao;
import cn.edu.nju.travel.entity.ActivityEntity;
import cn.edu.nju.travel.entity.RelationEntity;
import cn.edu.nju.travel.service.RelationService;
import cn.edu.nju.travel.service.StatisticService;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;

/**
 * Created on 2019/4/5
 */
@Service
public class StatisticServiceImpl implements StatisticService {

    @Resource
    RelationService relationService;
    @Resource
    ActivityDao activityDao;

    @Override
    public int[] getMonthData(int userId) throws Exception {
        int[] data = new int[12];
        List<RelationEntity> entities = relationService.findAllRelationByUserID(userId);
        if(entities == null){
            return data;
        }
        entities.forEach(relationEntity -> {
            ActivityEntity activityEntity = activityDao.findById(relationEntity.getActivityId())
                    .get();
            int month = activityEntity.getStartTime().getMonth();
            data[month] = data[month]+1;
        });
        List<ActivityEntity> activityEntities = activityDao.findAllByCreateId(userId);
        if(activityEntities == null){
            return data;
        }
        activityEntities.forEach(activityEntity -> {
            int month = activityEntity.getStartTime().getMonth();
            data[month] = data[month]+1;
        });
        return data;
    }
}
