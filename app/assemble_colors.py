from colormath.color_objects import LabColor, sRGBColor
from colormath.color_conversions import convert_color
from colormath.color_diff import delta_e_cie2000
import matplotlib.pyplot as plt

# For some reason, this workaround got rid of the error
import numpy

def patch_asscalar(a):
    return a.item()

setattr(numpy, "asscalar", patch_asscalar)

######################################################################

# List all of the html colors
html_colors = {
    "AliceBlue": (240, 248, 255),
    "AntiqueWhite": (250, 235, 215),
    "Aqua": (0, 255, 255),
    "Aquamarine": (127, 255, 212),
    "Azure": (240, 255, 255),
    "Beige": (245, 245, 220),
    "Bisque": (255, 228, 196),
    "Black": (0, 0, 0),
    "BlanchedAlmond": (255, 235, 205),
    "Blue": (0, 0, 255),
    "BlueViolet": (138, 43, 226),
    "Brown": (165, 42, 42),
    "BurlyWood": (222, 184, 135),
    "CadetBlue": (95, 158, 160),
    "Chartreuse": (127, 255, 0),
    "Chocolate": (210, 105, 30),
    "Coral": (255, 127, 80),
    "CornflowerBlue": (100, 149, 237),
    "Cornsilk": (255, 248, 220),
    "Crimson": (220, 20, 60),
    "Cyan": (0, 255, 255),
    "DarkBlue": (0, 0, 139),
    "DarkCyan": (0, 139, 139),
    "DarkGoldenRod": (184, 134, 11),
    "DarkGray": (169, 169, 169),
    "DarkGreen": (0, 100, 0),
    "DarkKhaki": (189, 183, 107),
    "DarkMagenta": (139, 0, 139),
    "DarkOliveGreen": (85, 107, 47),
    "DarkOrange": (255, 140, 0),
    "DarkOrchid": (153, 50, 204),
    "DarkRed": (139, 0, 0),
    "DarkSalmon": (233, 150, 122),
    "DarkSeaGreen": (143, 188, 143),
    "DarkSlateBlue": (72, 61, 139),
    "DarkSlateGray": (47, 79, 79),
    "DarkTurquoise": (0, 206, 209),
    "DarkViolet": (148, 0, 211),
    "DeepPink": (255, 20, 147),
    "DeepSkyBlue": (0, 191, 255),
    "DimGray": (105, 105, 105),
    "DodgerBlue": (30, 144, 255),
    "FireBrick": (178, 34, 34),
    "FloralWhite": (255, 250, 240),
    "ForestGreen": (34, 139, 34),
    "Fuchsia": (255, 0, 255),
    "Gainsboro": (220, 220, 220),
    "GhostWhite": (248, 248, 255),
    "Gold": (255, 215, 0),
    "GoldenRod": (218, 165, 32),
    "Gray": (128, 128, 128),
    "Green": (0, 128, 0),
    "GreenYellow": (173, 255, 47),
    "HoneyDew": (240, 255, 240),
    "HotPink": (255, 105, 180),
    "IndianRed": (205, 92, 92),
    "Indigo": (75, 0, 130),
    "Ivory": (255, 255, 240),
    "Khaki": (240, 230, 140),
    "Lavender": (230, 230, 250),
    "LavenderBlush": (255, 240, 245),
    "LawnGreen": (124, 252, 0),
    "LemonChiffon": (255, 250, 205),
    "LightBlue": (173, 216, 230),
    "LightCoral": (240, 128, 128),
    "LightCyan": (224, 255, 255),
    "LightGoldenRodYellow": (250, 250, 210),
    "LightGray": (211, 211, 211),
    "LightGreen": (144, 238, 144),
    "LightPink": (255, 182, 193),
    "LightSalmon": (255, 160, 122),
    "LightSeaGreen": (32, 178, 170),
    "LightSkyBlue": (135, 206, 250),
    "LightSlateGray": (119, 136, 153),
    "LightSteelBlue": (176, 196, 222),
    "LightYellow": (255, 255, 224),
    "Lime": (0, 255, 0),
    "LimeGreen": (50, 205, 50),
    "Linen": (250, 240, 230),
    "Magenta": (255, 0, 255),
    "Maroon": (128, 0, 0),
    "MediumAquaMarine": (102, 205, 170),
    "MediumBlue": (0, 0, 205),
    "MediumOrchid": (186, 85, 211),
    "MediumPurple": (147, 112, 219),
    "MediumSeaGreen": (60, 179, 113),
    "MediumSlateBlue": (123, 104, 238),
    "MediumSpringGreen": (0, 250, 154),
    "MediumTurquoise": (72, 209, 204),
    "MediumVioletRed": (199, 21, 133),
    "MidnightBlue": (25, 25, 112),
    "MintCream": (245, 255, 250),
    "MistyRose": (255, 228, 225),
    "Moccasin": (255, 228, 181),
    "NavajoWhite": (255, 222, 173),
    "Navy": (0, 0, 128),
    "OldLace": (253, 245, 230),
    "Olive": (128, 128, 0),
    "OliveDrab": (107, 142, 35),
    "Orange": (255, 165, 0),
    "OrangeRed": (255, 69, 0),
    "Orchid": (218, 112, 214),
    "PaleGoldenRod": (238, 232, 170),
    "PaleGreen": (152, 251, 152),
    "PaleTurquoise": (175, 238, 238),
    "PaleVioletRed": (219, 112, 147),
    "PapayaWhip": (255, 239, 213),
    "PeachPuff": (255, 218, 185),
    "Peru": (205, 133, 63),
    "Pink": (255, 192, 203),
    "Plum": (221, 160, 221),
    "PowderBlue": (176, 224, 230),
    "Purple": (128, 0, 128),
    "RebeccaPurple": (102, 51, 153),
    "Red": (255, 0, 0),
    "RosyBrown": (188, 143, 143),
    "RoyalBlue": (65, 105, 225),
    "SaddleBrown": (139, 69, 19),
    "Salmon": (250, 128, 114),
    "SandyBrown": (244, 164, 96),
    "SeaGreen": (46, 139, 87),
    "SeaShell": (255, 245, 238),
    "Sienna": (160, 82, 45),
    "Silver": (192, 192, 192),
    "SkyBlue": (135, 206, 235),
    "SlateBlue": (106, 90, 205),
    "SlateGray": (112, 128, 144),
    "Snow": (255, 250, 250),
    "SpringGreen": (0, 255, 127),
    "SteelBlue": (70, 130, 180),
    "Tan": (210, 180, 140),
    "Teal": (0, 128, 128),
    "Thistle": (216, 191, 216),
    "Tomato": (255, 99, 71),
    "Turquoise": (64, 224, 208),
    "Violet": (238, 130, 238),
    "Wheat": (245, 222, 179),
    "White": (255, 255, 255),
    "WhiteSmoke": (245, 245, 245),
    "Yellow": (255, 255, 0),
    "YellowGreen": (154, 205, 50)
}

# Functions to convert RGB to CIELAB
def rgb_to_lab(r, g, b):
    rgb = sRGBColor(r, g, b, is_upscaled=True)
    return convert_color(rgb, LabColor)

def color_difference(color1, color2):
    return delta_e_cie2000(color1, color2)

######################################################################

# Create 3d graph of the colors in rgb space

# from mpl_toolkits.mplot3d import Axes3D

# fig = plt.figure()
# ax = fig.add_subplot(111, projection='3d')

# for color, rgb in html_colors.items():
#     ax.scatter(rgb[0], rgb[1], rgb[2], color=color)

# ax.set_xlabel('Red')
# ax.set_ylabel('Green')
# ax.set_zlabel('Blue')

# plt.show()

######################################################################

# Find the center of the RGB space

import numpy as np

rgb_values = np.array(list(html_colors.values()))
rgb_center = np.mean(rgb_values, axis=0)

print(rgb_center)

# Show the color of the center as a color swatch
# plt.imshow([[rgb_center / 255]])
# plt.axis('off')
# plt.show()

# create a color graph of the named colors based on their distance from the center
lab_center = rgb_to_lab(*rgb_center)

color_distances_from_rgb_center = {}
for name, rgb in html_colors.items():
    lab = rgb_to_lab(*rgb)
    distance = color_difference(lab_center, lab)
    color_distances_from_rgb_center[name] = distance

sorted_colors_from_rgb_center = sorted(color_distances_from_rgb_center.items(), key=lambda x: x[1])

names, distances = zip(*sorted_colors_from_rgb_center)
colors = [html_colors[name] for name in names]

print(sorted_colors_from_rgb_center)

absolute_red = (255, 0, 0)

color_distances_from_absolute_red = {}
lab_absolute_red = rgb_to_lab(*absolute_red)
for name, rgb in html_colors.items():
    lab = rgb_to_lab(*rgb)
    distance = color_difference(lab_absolute_red, lab)
    color_distances_from_absolute_red[name] = distance

sorted_colors_from_absolute_red = sorted(color_distances_from_absolute_red.items(), key=lambda x: x[1])

names, distances = zip(*sorted_colors_from_absolute_red)
colors = [html_colors[name] for name in names]
print("__________ABSOLUTE RED__________")
print(sorted_colors_from_absolute_red)

absolute_green = (0, 255, 0)

color_distances_from_absolute_green = {}
lab_absolute_green = rgb_to_lab(*absolute_green)
for name, rgb in html_colors.items():
    lab = rgb_to_lab(*rgb)
    distance = color_difference(lab_absolute_green, lab)
    color_distances_from_absolute_green[name] = distance

sorted_colors_from_absolute_green = sorted(color_distances_from_absolute_green.items(), key=lambda x: x[1])

names, distances = zip(*sorted_colors_from_absolute_green)
colors = [html_colors[name] for name in names]
print("__________ABSOLUTE GREEN__________")
print(sorted_colors_from_absolute_green)

absolute_blue = (0, 0, 255)

color_distances_from_absolute_blue = {}
lab_absolute_blue = rgb_to_lab(*absolute_blue)

for name, rgb in html_colors.items():
    lab = rgb_to_lab(*rgb)
    distance = color_difference(lab_absolute_blue, lab)
    color_distances_from_absolute_blue[name] = distance

sorted_colors_from_absolute_blue = sorted(color_distances_from_absolute_blue.items(), key=lambda x: x[1])

names, distances = zip(*sorted_colors_from_absolute_blue)
colors = [html_colors[name] for name in names]
print("__________ABSOLUTE BLUE__________")

print(sorted_colors_from_absolute_blue)

# fig, ax = plt.subplots(figsize=(20, 5))

# left = 0
# for name, distance, color in zip(names, distances, colors):
#     ax.barh(0, distance, left=left, color=np.array(color) / 255, height=1, edgecolor='none')
#     left += distance

# ax.axis('off')
# plt.title('HTML Named Colors: Distance from RGB Center')
# plt.tight_layout()
# plt.show()

# second_level_challenge

min_num = 20
max_num = 50

rand_num = np.random.randint(min_num, max_num)
red_family_color = sorted_colors_from_absolute_red[rand_num][0]

rand_num = np.random.randint(min_num, max_num)
green_family_color = sorted_colors_from_absolute_green[rand_num][0]

rand_num = np.random.randint(min_num, max_num)
blue_family_color = sorted_colors_from_absolute_blue[rand_num][0]

# create a plot of the colors from the red, green, and blue families
fig, ax = plt.subplots(figsize=(20, 5))

colors = [red_family_color, green_family_color, blue_family_color]

left = 0
for color in colors:
    ax.barh(0, 1, left=left, color=np.array(html_colors[color]) / 255, height=1, edgecolor='none')
    left += 1

ax.axis('off')
# choose randomly between the colors from the three families

name = np.random.choice(colors)

plt.title(name)
plt.tight_layout()
plt.show()



