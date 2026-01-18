package com.foodapp.food_delivery.mapper;

import com.foodapp.food_delivery.dto.request.RestaurantRequest;
import com.foodapp.food_delivery.dto.response.RestaurantResponse;
import com.foodapp.food_delivery.model.Category;
import com.foodapp.food_delivery.model.Restaurant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
@Mapper(componentModel = "spring", uses = {MenuMapper.class})
public interface RestaurantMapper {
    @Mapping(source = "restaurantId", target = "id")
    @Mapping(target = "tags", source = "categories", qualifiedByName = "mapCategoriesToTags")
    @Mapping(source = "menuItems", target = "menu")
    RestaurantResponse toRestaurantResponse(Restaurant restaurant);

    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "orders", ignore = true)
    @Mapping(target = "reviews", ignore = true)
    @Mapping(target = "restaurantId", ignore = true)
    @Mapping(target = "menuItems", ignore = true)
    @Mapping(target = "openingTime", ignore = true) // defaulting or set in service
    @Mapping(target = "closingTime", ignore = true)
    @Mapping(target = "rating", ignore = true)
    Restaurant toRestaurant(RestaurantRequest request);

    @Named("mapCategoriesToTags")
    default List<String> mapCategoriesToTags(Set<Category> categories) {
        if (categories == null) return null;
        return categories.stream().map(Category::getName).collect(Collectors.toList());
    }
}
