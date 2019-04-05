package cn.edu.nju.travel.service;

import cn.edu.nju.travel.form.BlogForm;
import cn.edu.nju.travel.vo.BlogVO;
import java.util.List;

/**
 * Created on 2019/4/5
 */
public interface BlogService {

    BlogVO releaseBlog(int userId, BlogForm blogForm);

    void deleteBlog(int userId, int id);

    List<BlogVO> getUserBlogs(int userId, int size, long lastTime);

    List<BlogVO> getConcernUsersBlogs(int userId, int size, long lastTime);

    boolean isUserBlog(int userId, int blogId);
}
