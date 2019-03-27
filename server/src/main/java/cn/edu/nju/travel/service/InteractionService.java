package cn.edu.nju.travel.service;

import cn.edu.nju.travel.constant.LikeEntityType;

/**
 * Created on 2019/3/27
 */
public interface InteractionService {

    int like(int userId, int referId, LikeEntityType type);

    int unlike(int userId, int referId, LikeEntityType type);

    boolean isLike(int userId, int referId, LikeEntityType type);

}
