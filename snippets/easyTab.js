import ScrollableTabView from 'react-native-scrollable-tab-view'

<ScrollableTabView
style={styles.container}
tabBarBackgroundColor='white'
tabBarActiveTextColor={theme.color}
tabBarTextStyle={styles.tabBarText}
tabBarUnderlineStyle={styles.tabBarUnderline}
initialPage={0}
>
{
data.map((value,index)=>(
  <CategoryListView
    tabLabel={value.title}
    key={index}
    itemDatas={value.detail}
    navigation={this.props.navigation}/>
))
}

</ScrollableTabView>