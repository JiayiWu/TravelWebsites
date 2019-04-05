package cn.edu.nju.travel.service;

import cn.edu.nju.travel.constant.LikeEntityType;
import cn.edu.nju.travel.form.CommentForm;
import cn.edu.nju.travel.vo.CommentVO;
import cn.edu.nju.travel.vo.UserInfoVO;
import java.util.List;

/**
 * Created on 2019/3/27
 */
public interface InteractionService {

    int like(int userId, int referId, LikeEntityType type);

    int unlike(int userId, int referId, LikeEntityType type);

    boolean isLike(int userId, int referId, LikeEntityType type);

    CommentVO addComment(int userId, CommentForm commentForm);

    List<CommentVO> getComments(int referId, LikeEntityType type);

    void deleteComment(int id);

    boolean isUserComment(int userId, int commentId);

    void concernUser(int selfId, int concernedUserId);

    void unConcern(int selfId, int concernedUserId);

    List<UserInfoVO> getConcernUserList(int selfId, int size, int lastUserId);

    boolean isUserConcerned(int userId, int concernedUserId);

    int getConcernNum(int userId);


}
