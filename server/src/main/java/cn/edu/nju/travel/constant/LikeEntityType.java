package cn.edu.nju.travel.constant;

/**
 * Created on 2019/3/27
 */
public enum LikeEntityType {

    ACTIVITY(1),
    BLOG(2);

    private int value;
    LikeEntityType(int value){
        this.value = value;
    }

    public int getValue(){
        return this.value;
    }

    public static LikeEntityType getTypeByValue(int value){
        switch (value){
            case 1: return ACTIVITY;
            case 2: return BLOG;
            default: return null;
        }
    }

}
