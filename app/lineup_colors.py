from colormath.color_objects import LabColor, sRGBColor
from colormath.color_conversions import convert_color
from colormath.color_diff import delta_e_cie2000
import webcolors
import matplotlib.pyplot as plt

# Define the center of CIELAB color space
lab_center = LabColor(50, 0, 0)

# Function to convert RGB to LAB
def rgb_to_lab(r, g, b):
    rgb = sRGBColor(r, g, b, is_upscaled=True)
    return convert_color(rgb, LabColor)

# For some reason, this workaround got rid of the error
import numpy

def patch_asscalar(a):
    return a.item()

setattr(numpy, "asscalar", patch_asscalar)

# Get all named HTML colors
named_colors = webcolors.names("css3")

# Calculate distance for each color
color_distances = {}
for name in named_colors:
    hex_value = webcolors.name_to_hex(name)
    rgb = webcolors.hex_to_rgb(hex_value)
    lab = rgb_to_lab(*rgb)
    distance = delta_e_cie2000(lab_center, lab)
    color_distances[name] = distance

# Sort colors by distance
sorted_colors = sorted(color_distances.items(), key=lambda x: x[1])

# Prepare data for plotting
names, distances = zip(*sorted_colors)
colors = [webcolors.name_to_hex(name) for name in names]

# Create the plot
fig, ax = plt.subplots(figsize=(20, 5))

# Plot color bars
left = 0
for name, distance, color in zip(names, distances, colors):
    ax.barh(0, distance, left=left, color=color, height=1, edgecolor='none')
    left += distance

# Remove axes
ax.axis('off')

# Add title
plt.title('HTML Named Colors: Distance from CIELAB Center (50, 0, 0)')

# Show the plot
plt.tight_layout()
plt.show()