package cn.edu.nju.travel.service.impl;

import cn.edu.nju.travel.constant.LikeEntityType;
import cn.edu.nju.travel.dao.ActivityDao;
import cn.edu.nju.travel.dao.CommentDao;
import cn.edu.nju.travel.dao.ConcernDao;
import cn.edu.nju.travel.dao.LikeDao;
import cn.edu.nju.travel.dao.UserDao;
import cn.edu.nju.travel.entity.ActivityEntity;
import cn.edu.nju.travel.entity.CommentEntity;
import cn.edu.nju.travel.entity.ConcernEntity;
import cn.edu.nju.travel.entity.LikeEntity;
import cn.edu.nju.travel.entity.UserEntity;
import cn.edu.nju.travel.form.CommentForm;
import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.service.InteractionService;
import cn.edu.nju.travel.utils.ServerException;
import cn.edu.nju.travel.vo.CommentVO;
import cn.edu.nju.travel.vo.UserInfoVO;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
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
    private LikeDao likeDao;
    @Resource
    private ActivityDao activityDao;
    @Resource
    private CommentDao commentDao;
    @Resource
    private UserDao userDao;
    @Resource
    private ConcernDao concernDao;

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

    @Override
    public CommentVO addComment(int userId, CommentForm commentForm) {
        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setContent(commentForm.getContent());
        commentEntity.setCreatorId(userId);
        commentEntity.setParentId(commentForm.getParentId());
        commentEntity.setReferId(commentForm.getReferId());
        commentEntity.setType(commentForm.getType());
        commentEntity = commentDao.save(commentEntity);
        return getCommentVOByEntity(commentEntity);
    }

    @Override
    public List<CommentVO> getComments(int referId, LikeEntityType type) {
        List<CommentEntity> entities = commentDao.findByReferIdAndType(referId, type.getValue());
        return entities.stream().map(this::getCommentVOByEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteComment(int id) {
        commentDao.deleteById(id);
    }

    @Override
    public boolean isUserComment(int userId, int commentId) {
        CommentEntity entity = commentDao.findByIdAndCreatorId(commentId, userId);
        return entity != null;
    }

    @Override
    public void concernUser(int selfId, int concernedUserId) {
        ConcernEntity concernEntity = concernDao.findByUserIdAndConcernedId(selfId, concernedUserId);
        if(concernEntity != null){
            throw new ServerException(ResponseCode.Error, "登陆用户已关注该用户");
        }
        concernEntity = new ConcernEntity();
        concernEntity.setUserId(selfId);
        concernEntity.setConcernedId(concernedUserId);
        concernDao.save(concernEntity);
        UserEntity concernedUser = userDao.findById(concernedUserId);
        concernedUser.setFansNum(concernedUser.getFansNum()+1);
        userDao.save(concernedUser);
    }

    @Override
    public void unConcern(int selfId, int concernedUserId) {
        ConcernEntity concernEntity = concernDao.findByUserIdAndConcernedId(selfId,
                concernedUserId);
        if(concernEntity == null){
            throw new ServerException(ResponseCode.Error, "登录用户尚未关注此用户");
        }
        concernDao.delete(concernEntity);
        UserEntity concernedUser = userDao.findById(concernedUserId);
        concernedUser.setFansNum(concernedUser.getFansNum()-1);
        userDao.save(concernedUser);
    }

    @Override
    public List<UserInfoVO> getConcernUserList(int selfId, int size, int lastUserId) {
        List<Integer> idList;
        if(lastUserId == 0){
            idList = concernDao.findConcernedUserIdsFirstPage(selfId, size);
        }else{
            idList = concernDao.findConcernedUserIds(selfId, size, lastUserId);
        }
        List<UserInfoVO> voList = new ArrayList<>();
        for(int uid:idList){
            voList.add(new UserInfoVO(userDao.findById(uid)));
        }
        return voList;
    }

    @Override
    public boolean isUserConcerned(int userId, int concernedUserId) {
        return concernDao.findByUserIdAndConcernedId(userId, concernedUserId) != null;
    }

    @Override
    public int getConcernNum(int userId) {
        return concernDao.countConcernEntitiesByUserId(userId);
    }


    private CommentVO getCommentVOByEntity(CommentEntity entity){
        CommentVO vo = new CommentVO();
        vo.setId(entity.getId());//id
        vo.setContent(entity.getContent());//内容
        vo.setCreateTime(entity.getCreateTime().getTime());//评论时间
        UserEntity creator = userDao.findById(entity.getCreatorId());
        vo.setCommenter(creator.getName());//评论者姓名
        Integer parentId = entity.getParentId();
        if(parentId != null && parentId != 0){
            vo.setParentId(parentId);//被回复的评论id
            CommentEntity parentComment = commentDao.getOne(parentId);
            int commentedUserId = parentComment.getCreatorId();
            UserEntity commentedUser = userDao.findById(commentedUserId);
            vo.setCommentedUser(commentedUser.getName());//被评论者姓名
        }

        return vo;
    }
}
