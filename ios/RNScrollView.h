#import <React/RCTScrollView.h>

@interface RCTScrollView()

- (void)sendScrollEventWithName:(NSString *)eventName
                     scrollView:(UIScrollView *)scrollView
                       userData:(NSDictionary *)userData;

@end

@interface RNScrollView : RCTScrollView

- (void)endRefresh;
- (void)endLoading;

@end
