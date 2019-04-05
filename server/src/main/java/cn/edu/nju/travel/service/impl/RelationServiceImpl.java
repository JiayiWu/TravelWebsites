package cn.edu.nju.travel.service.impl;

import cn.edu.nju.travel.constant.ApproveStateCode;
import cn.edu.nju.travel.constant.JoinTypeCode;
import cn.edu.nju.travel.constant.RelationStateCode;
import cn.edu.nju.travel.dao.ActivityDao;
import cn.edu.nju.travel.dao.AuditDao;
import cn.edu.nju.travel.dao.RelationDao;
import cn.edu.nju.travel.entity.ActivityEntity;
import cn.edu.nju.travel.entity.AuditEntity;
import cn.edu.nju.travel.entity.RelationEntity;
import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.service.ActivityService;
import cn.edu.nju.travel.service.RelationService;
import cn.edu.nju.travel.service.UserService;
import cn.edu.nju.travel.utils.ServerException;
import cn.edu.nju.travel.vo.ActivityInfoVO;
import cn.edu.nju.travel.vo.AuthenticationInfoListVO;
import cn.edu.nju.travel.vo.UserInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by yuhqqq on 2019/1/16.
 */
@Service
@Transactional
public class RelationServiceImpl implements RelationService {

    @Autowired
    RelationDao relationDao;

    @Autowired
    ActivityDao activityDao;

    @Autowired
    AuditDao auditDao;

    @Autowired
    ActivityService activityService;

    @Autowired
    UserService userService;

    @Override
    public List<RelationEntity> findAllRelationByActivityId(Integer activityId) throws Exception{
        Iterable<RelationEntity> relationEntityIterable = relationDao.findAllByActivityId(activityId);

        List<RelationEntity> relationEntityList = new ArrayList<>();
        relationEntityIterable.forEach(relationEntity -> relationEntityList.add(relationEntity));

        return relationEntityList;
    }

    @Override
    public List<RelationEntity> findAllRelationByUserID(Integer userId) {
        return relationDao.findByUserId(userId);
    }

    @Override
    public int attendActivity(Integer activityId, Integer userId, String attachmentUrl, String context) throws Exception {
        ActivityEntity activityEntity = activityDao.findById(activityId).get();
        if(activityEntity == null){
            throw new ServerException(ResponseCode.Error,"没有这项活动");
        }
        if(userId == 0){
            throw new ServerException(ResponseCode.Error,"userId不能为空");
        }
        RelationEntity relationEntity = new RelationEntity();
        relationEntity.setActivityId(activityId);
        relationEntity.setUserId(userId);
        if(activityEntity.getJoinType().equals(JoinTypeCode.DIRECT.getIndex())){
            relationEntity.setState(RelationStateCode.VALID.getIndex());
            relationDao.save(relationEntity);
        }else if(activityEntity.getJoinType().equals(JoinTypeCode.AUTH.getIndex())){
            relationEntity.setState(RelationStateCode.INVALID
                    .getIndex());
            AuditEntity auditEntity = new AuditEntity();
            auditEntity.setActivityId(activityId);
            auditEntity.setUrl(attachmentUrl);
            auditEntity.setActivityCreateId(activityEntity.getCreateId());
            auditEntity.setJoinUserId(userId);
            auditEntity.setState(ApproveStateCode.NEW.getIndex());
            auditEntity.setContext(context);
            auditDao.save(auditEntity);
            relationDao.save(relationEntity);
        }else {
            throw new ServerException(ResponseCode.Error, "错误的JoinType");
        }


        return 0;
    }

    @Override
    public int quitActivity(Integer activityId, Integer userId) throws Exception {
//        Iterable<RelationEntity> relationEntityIterable = relationDao.findAllByActivityIdAndUserId(activityId, userId);
//        Iterable<AuditEntity> auditEntityIterable = auditDao.findAllByActivityIdAndUserId(activityId,userId);

        //判断哪些需要修改的逻辑只能放在Dao里
        //对于relation：state从0变为2（有效->删除）
        //对于audit：state从0/1变为3（待审批->删除；通过->删除）

//        for(RelationEntity relationEntity : relationEntityIterable){
//            //只有通过批准的才可能出现退出操作;且同一个活动同一个用户应该只会出现一次通过批准；
//            if(relationEntity.getState() == 0){
//                relationDao.updateStateDelete(activityId,userId);
//                break;
//            }
//        }
//        for(AuditEntity auditEntity : auditEntityIterable){
//
//        }

        relationDao.updateStateDelete(activityId,userId);
        auditDao.updateAuditDelete(activityId,userId);

        return 0;
    }

    @Override
    public int auditAttendActivity(Integer activityId, Integer userId, Integer result) throws Exception {

        auditDao.updateAuditApproveOrRefuse(activityId, userId, result);

        if(result.equals(1)){
            //通过申请
            relationDao.updateStateValid(activityId, userId);
        }
        //不批准的话原本就是INVALID，不需要修改state
        return 0;
    }

    @Override
    public List<AuthenticationInfoListVO> getAuditInfoList(Integer creatorId, Integer state) throws Exception{

        List<AuditEntity> auditEntityList = auditDao.findAllByActivityCreateId(creatorId);
        List<AuthenticationInfoListVO> authenticationInfoListVOList = new ArrayList<>();

        for(AuditEntity auditEntity : auditEntityList){
            AuthenticationInfoListVO authenticationInfoListVO = new AuthenticationInfoListVO();
            ActivityInfoVO activityInfoVO = activityService.findActivityById(auditEntity.getActivityId());
            authenticationInfoListVO.setActivity(activityInfoVO);

            UserInfoVO userInfoVO = userService.findById(auditEntity.getJoinUserId());
            authenticationInfoListVO.setApplyUserInfo(userInfoVO);
            authenticationInfoListVO.setCreateTime(auditEntity.getCreateTime().getTime());
            authenticationInfoListVO.setModifyTime(auditEntity.getModifyTime().getTime());
            authenticationInfoListVO.setState(auditEntity.getState());
            //todo
            //attachment = null
            authenticationInfoListVO.setAttachmentUrl(auditEntity.getUrl());
            authenticationInfoListVO.setContext(auditEntity.getContext());
            authenticationInfoListVO.setId(auditEntity.getId());

            authenticationInfoListVOList.add(authenticationInfoListVO);
        }

        switch (state){
            case -1:
                //state -1获取该用户可以看见的所有审批，0 查看待处审批 1 查看审批通过申请  2  查看审批拒绝的申请
                return authenticationInfoListVOList;
            case 0:
                Iterator<AuthenticationInfoListVO> iterator = authenticationInfoListVOList.iterator();
                //修复迭代器错误
                while(iterator.hasNext()){
                    AuthenticationInfoListVO authenticationInfoListVO = iterator.next();
                    if(!authenticationInfoListVO.getState().equals(ApproveStateCode.NEW.getIndex())){
                        iterator.remove();
                    }
                }
                return  authenticationInfoListVOList;
            case 1:
                List<AuthenticationInfoListVO> result = new ArrayList<>();
                for(AuthenticationInfoListVO authenticationInfoListVO : authenticationInfoListVOList){
                    if(authenticationInfoListVO.getState().equals(ApproveStateCode.ACCEPT.getIndex())){
                        result.add(authenticationInfoListVO);
                    }
                }
                return  result;
            case 2:
                List<AuthenticationInfoListVO> result2 = new ArrayList<>();
                for(AuthenticationInfoListVO authenticationInfoListVO : authenticationInfoListVOList){
                    if(authenticationInfoListVO.getState().equals(ApproveStateCode.REJECT.getIndex())){
                        result2.add(authenticationInfoListVO);
                    }
                }
                return  result2;
            default:
                throw new ServerException(ResponseCode.Error,"错误的state");
        }

    }
}
