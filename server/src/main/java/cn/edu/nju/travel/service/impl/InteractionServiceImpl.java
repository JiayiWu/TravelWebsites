package cn.edu.nju.travel.service.impl;

import cn.edu.nju.travel.constant.LikeEntityType;
import cn.edu.nju.travel.dao.ActivityDao;
import cn.edu.nju.travel.dao.LikeDao;
import cn.edu.nju.travel.entity.ActivityEntity;
import cn.edu.nju.travel.entity.LikeEntity;
import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.service.InteractionService;
import cn.edu.nju.travel.utils.ServerException;
import javax.annotation.Resource;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

/**
 * Created on 2019/3/27
 */
@Service
@Transactional
public class InteractionServiceImpl implements InteractionService {

    @Resource
    private
    LikeDao likeDao;
    @Resource
    private
    ActivityDao activityDao;

    @Override
    public int like(int userId, int referId, LikeEntityType type) {
        LikeEntity likeEntity = new LikeEntity();
        likeEntity.setUserId(userId);
        likeEntity.setReferId(referId);
        likeEntity.setType(type.getValue());
        likeDao.save(likeEntity);
        switch (type){
            case ACTIVITY:
                ActivityEntity activityEntity = activityDao.findById(referId).get();
                int newCount = activityEntity.getLikeCounts()==null?1:activityEntity
                        .getLikeCounts()+1;
                activityEntity.setLikeCounts(newCount);
                activityEntity = activityDao.save(activityEntity);
                return activityEntity.getLikeCounts();
            case BLOG:
                //todo

        }
        return 0;
    }

    @Override
    public int unlike(int userId, int referId, LikeEntityType type) {
        LikeEntity likeEntity = likeDao.findByUserIdAndReferIdAndType(userId, referId, type
                .getValue());
        if(likeEntity == null){
            throw new ServerException(ResponseCode.Error,"未点赞的实体不能取消赞");
        }
        likeDao.delete(likeEntity);
        switch (type){
            case ACTIVITY:
                ActivityEntity activityEntity = activityDao.findById(referId).get();
                activityEntity.setLikeCounts(activityEntity.getLikeCounts()-1);
                activityEntity = activityDao.save(activityEntity);
                return activityEntity.getLikeCounts();
            case BLOG:
                //todo
        }
        return 0;
    }

    @Override
    public boolean isLike(int userId, int referId, LikeEntityType type) {
        return likeDao.findByUserIdAndReferIdAndType(userId, referId, type.getValue())!=null;
    }
}
