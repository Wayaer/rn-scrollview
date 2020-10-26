#import <React/RCTScrollView.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTScrollView()

- (void)sendScrollEventWithName:(NSString *)eventName
                     scrollView:(UIScrollView *)scrollView
                       userData:(NSDictionary *)userData;

@end

@interface RNScrollView : RCTScrollView

-(void)endRefresh;
- (void)endLoading;

@end

NS_ASSUME_NONNULL_END
