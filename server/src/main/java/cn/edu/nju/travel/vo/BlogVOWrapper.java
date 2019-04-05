package cn.edu.nju.travel.vo;

import cn.edu.nju.travel.entity.BlogEntity;
import java.util.ArrayList;
import java.util.Arrays;
import org.springframework.stereotype.Component;

/**
 * Created on 2019/4/5
 */
@Component
public class BlogVOWrapper {

    public BlogVO wrapEntity2VO(BlogEntity entity){
        BlogVO vo = new BlogVO();
        vo.setId(entity.getId());
        vo.setContent(entity.getContent());
        vo.setCreateTime(entity.getCreateTime().getTime());
        vo.setLikeCount(entity.getLikeCount());
        String photoStr = entity.getPhotos();
        vo.setPhotos(photoStr==null||photoStr.isEmpty()?new ArrayList<>():Arrays.asList(photoStr
                .split(",")));
        vo.setUserId(entity.getUserId());
        return vo;
    }

}
